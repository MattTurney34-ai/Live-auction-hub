-- =====================================================
-- Live Auction Hub - Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Created: 2025-12-27
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    phone VARCHAR(20),
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- =====================================================
-- AUCTIONS TABLE
-- =====================================================
CREATE TABLE auctions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    condition VARCHAR(20) CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
    starting_price DECIMAL(12,2) NOT NULL CHECK (starting_price >= 0),
    current_price DECIMAL(12,2) NOT NULL CHECK (current_price >= 0),
    reserve_price DECIMAL(12,2) CHECK (reserve_price >= 0),
    buy_now_price DECIMAL(12,2) CHECK (buy_now_price >= 0),
    bid_increment DECIMAL(12,2) DEFAULT 1.00 CHECK (bid_increment > 0),
    image_urls TEXT[],
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'cancelled', 'sold')),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    view_count INTEGER DEFAULT 0,
    bid_count INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    shipping_cost DECIMAL(10,2) DEFAULT 0.00,
    shipping_options TEXT[],
    location VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_auction_dates CHECK (end_time > start_time),
    CONSTRAINT valid_reserve_price CHECK (reserve_price IS NULL OR reserve_price >= starting_price),
    CONSTRAINT valid_buy_now_price CHECK (buy_now_price IS NULL OR buy_now_price > starting_price)
);

-- Create indexes for auctions table
CREATE INDEX idx_auctions_seller_id ON auctions(seller_id);
CREATE INDEX idx_auctions_status ON auctions(status);
CREATE INDEX idx_auctions_category ON auctions(category);
CREATE INDEX idx_auctions_start_time ON auctions(start_time);
CREATE INDEX idx_auctions_end_time ON auctions(end_time);
CREATE INDEX idx_auctions_current_price ON auctions(current_price);
CREATE INDEX idx_auctions_featured ON auctions(featured) WHERE featured = TRUE;
CREATE INDEX idx_auctions_active ON auctions(status, end_time) WHERE status = 'active';
CREATE INDEX idx_auctions_created_at ON auctions(created_at DESC);

-- =====================================================
-- BIDS TABLE
-- =====================================================
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
    bidder_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    max_bid DECIMAL(12,2) CHECK (max_bid >= amount),
    is_auto_bid BOOLEAN DEFAULT FALSE,
    is_winning BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'outbid', 'winning', 'lost', 'won')),
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT no_self_bidding CHECK (bidder_id != (SELECT seller_id FROM auctions WHERE id = auction_id))
);

-- Create indexes for bids table
CREATE INDEX idx_bids_auction_id ON bids(auction_id);
CREATE INDEX idx_bids_bidder_id ON bids(bidder_id);
CREATE INDEX idx_bids_amount ON bids(amount DESC);
CREATE INDEX idx_bids_created_at ON bids(created_at DESC);
CREATE INDEX idx_bids_winning ON bids(is_winning) WHERE is_winning = TRUE;
CREATE UNIQUE INDEX idx_bids_winning_per_auction ON bids(auction_id) WHERE is_winning = TRUE;

-- =====================================================
-- WATCHLIST TABLE
-- =====================================================
CREATE TABLE watchlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
    notify_on_bid BOOLEAN DEFAULT TRUE,
    notify_on_outbid BOOLEAN DEFAULT TRUE,
    notify_before_end BOOLEAN DEFAULT TRUE,
    notify_minutes_before INTEGER DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, auction_id)
);

-- Create indexes for watchlist table
CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX idx_watchlist_auction_id ON watchlist(auction_id);
CREATE INDEX idx_watchlist_created_at ON watchlist(created_at DESC);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('bid_placed', 'outbid', 'auction_won', 'auction_lost', 'auction_ending', 'auction_started', 'watchlist_update', 'message', 'system')),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    related_auction_id UUID REFERENCES auctions(id) ON DELETE SET NULL,
    related_bid_id UUID REFERENCES bids(id) ON DELETE SET NULL,
    related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_email_sent BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for notifications table
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger to update updated_at timestamp on users table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auctions_updated_at
    BEFORE UPDATE ON auctions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update auction current_price and bid_count when a bid is placed
CREATE OR REPLACE FUNCTION update_auction_on_bid()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE auctions
    SET 
        current_price = NEW.amount,
        bid_count = bid_count + 1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.auction_id;
    
    -- Mark previous winning bid as outbid
    UPDATE bids
    SET 
        is_winning = FALSE,
        status = 'outbid'
    WHERE auction_id = NEW.auction_id
    AND id != NEW.id
    AND is_winning = TRUE;
    
    -- Mark new bid as winning
    NEW.is_winning = TRUE;
    NEW.status = 'winning';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_auction_on_bid
    BEFORE INSERT ON bids
    FOR EACH ROW
    EXECUTE FUNCTION update_auction_on_bid();

-- Trigger to validate bid amount
CREATE OR REPLACE FUNCTION validate_bid_amount()
RETURNS TRIGGER AS $$
DECLARE
    auction_record RECORD;
    highest_bid DECIMAL(12,2);
BEGIN
    -- Get auction details
    SELECT current_price, bid_increment, status, end_time, seller_id
    INTO auction_record
    FROM auctions
    WHERE id = NEW.auction_id;
    
    -- Check if auction is active
    IF auction_record.status != 'active' THEN
        RAISE EXCEPTION 'Cannot bid on inactive auction';
    END IF;
    
    -- Check if auction has ended
    IF auction_record.end_time < CURRENT_TIMESTAMP THEN
        RAISE EXCEPTION 'Cannot bid on ended auction';
    END IF;
    
    -- Check minimum bid amount
    IF NEW.amount < auction_record.current_price + auction_record.bid_increment THEN
        RAISE EXCEPTION 'Bid amount must be at least % (current price + bid increment)', 
            auction_record.current_price + auction_record.bid_increment;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_bid_amount
    BEFORE INSERT ON bids
    FOR EACH ROW
    EXECUTE FUNCTION validate_bid_amount();

-- Trigger to auto-complete auctions when end_time is reached
CREATE OR REPLACE FUNCTION complete_expired_auctions()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'active' AND NEW.end_time <= CURRENT_TIMESTAMP THEN
        NEW.status = 'completed';
        
        -- Mark winning bid as won
        UPDATE bids
        SET status = 'won'
        WHERE auction_id = NEW.id
        AND is_winning = TRUE;
        
        -- Mark other bids as lost
        UPDATE bids
        SET status = 'lost'
        WHERE auction_id = NEW.id
        AND is_winning = FALSE
        AND status = 'active';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_complete_expired_auctions
    BEFORE UPDATE ON auctions
    FOR EACH ROW
    EXECUTE FUNCTION complete_expired_auctions();

-- Trigger to create notification when user is outbid
CREATE OR REPLACE FUNCTION notify_on_outbid()
RETURNS TRIGGER AS $$
DECLARE
    outbid_user_id UUID;
    auction_title VARCHAR(200);
BEGIN
    -- Get the user who was outbid
    SELECT bidder_id INTO outbid_user_id
    FROM bids
    WHERE auction_id = NEW.auction_id
    AND is_winning = FALSE
    AND status = 'outbid'
    AND bidder_id != NEW.bidder_id
    ORDER BY created_at DESC
    LIMIT 1;
    
    IF outbid_user_id IS NOT NULL THEN
        -- Get auction title
        SELECT title INTO auction_title
        FROM auctions
        WHERE id = NEW.auction_id;
        
        -- Create notification
        INSERT INTO notifications (user_id, type, title, message, related_auction_id, related_bid_id, priority)
        VALUES (
            outbid_user_id,
            'outbid',
            'You have been outbid!',
            'Someone has placed a higher bid on "' || auction_title || '"',
            NEW.auction_id,
            NEW.id,
            'high'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_on_outbid
    AFTER INSERT ON bids
    FOR EACH ROW
    EXECUTE FUNCTION notify_on_outbid();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY users_select_policy ON users
    FOR SELECT
    USING (TRUE); -- All users can view other users' public info

CREATE POLICY users_update_policy ON users
    FOR UPDATE
    USING (id = current_setting('app.current_user_id')::UUID)
    WITH CHECK (id = current_setting('app.current_user_id')::UUID);

CREATE POLICY users_delete_policy ON users
    FOR DELETE
    USING (id = current_setting('app.current_user_id')::UUID);

-- Auctions table policies
CREATE POLICY auctions_select_policy ON auctions
    FOR SELECT
    USING (status IN ('active', 'completed', 'sold') OR seller_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY auctions_insert_policy ON auctions
    FOR INSERT
    WITH CHECK (seller_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY auctions_update_policy ON auctions
    FOR UPDATE
    USING (seller_id = current_setting('app.current_user_id')::UUID)
    WITH CHECK (seller_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY auctions_delete_policy ON auctions
    FOR DELETE
    USING (seller_id = current_setting('app.current_user_id')::UUID AND status = 'draft');

-- Bids table policies
CREATE POLICY bids_select_policy ON bids
    FOR SELECT
    USING (
        bidder_id = current_setting('app.current_user_id')::UUID
        OR auction_id IN (SELECT id FROM auctions WHERE seller_id = current_setting('app.current_user_id')::UUID)
        OR is_winning = TRUE
    );

CREATE POLICY bids_insert_policy ON bids
    FOR INSERT
    WITH CHECK (bidder_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY bids_update_policy ON bids
    FOR UPDATE
    USING (FALSE); -- Bids cannot be updated once placed

CREATE POLICY bids_delete_policy ON bids
    FOR DELETE
    USING (FALSE); -- Bids cannot be deleted once placed

-- Watchlist table policies
CREATE POLICY watchlist_select_policy ON watchlist
    FOR SELECT
    USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY watchlist_insert_policy ON watchlist
    FOR INSERT
    WITH CHECK (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY watchlist_update_policy ON watchlist
    FOR UPDATE
    USING (user_id = current_setting('app.current_user_id')::UUID)
    WITH CHECK (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY watchlist_delete_policy ON watchlist
    FOR DELETE
    USING (user_id = current_setting('app.current_user_id')::UUID);

-- Notifications table policies
CREATE POLICY notifications_select_policy ON notifications
    FOR SELECT
    USING (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY notifications_insert_policy ON notifications
    FOR INSERT
    WITH CHECK (TRUE); -- System can create notifications for any user

CREATE POLICY notifications_update_policy ON notifications
    FOR UPDATE
    USING (user_id = current_setting('app.current_user_id')::UUID)
    WITH CHECK (user_id = current_setting('app.current_user_id')::UUID);

CREATE POLICY notifications_delete_policy ON notifications
    FOR DELETE
    USING (user_id = current_setting('app.current_user_id')::UUID);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get active auctions
CREATE OR REPLACE FUNCTION get_active_auctions()
RETURNS TABLE (
    id UUID,
    title VARCHAR(200),
    current_price DECIMAL(12,2),
    end_time TIMESTAMP WITH TIME ZONE,
    bid_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT a.id, a.title, a.current_price, a.end_time, a.bid_count
    FROM auctions a
    WHERE a.status = 'active'
    AND a.end_time > CURRENT_TIMESTAMP
    ORDER BY a.end_time ASC;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's winning bids
CREATE OR REPLACE FUNCTION get_user_winning_bids(p_user_id UUID)
RETURNS TABLE (
    auction_id UUID,
    auction_title VARCHAR(200),
    bid_amount DECIMAL(12,2),
    bid_time TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT a.id, a.title, b.amount, b.created_at
    FROM bids b
    JOIN auctions a ON b.auction_id = a.id
    WHERE b.bidder_id = p_user_id
    AND b.is_winning = TRUE
    AND a.status = 'active'
    ORDER BY b.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate time remaining for auction
CREATE OR REPLACE FUNCTION get_auction_time_remaining(p_auction_id UUID)
RETURNS INTERVAL AS $$
DECLARE
    auction_end_time TIMESTAMP WITH TIME ZONE;
BEGIN
    SELECT end_time INTO auction_end_time
    FROM auctions
    WHERE id = p_auction_id;
    
    IF auction_end_time IS NULL THEN
        RETURN NULL;
    END IF;
    
    RETURN auction_end_time - CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INITIAL DATA / SEED DATA (Optional)
-- =====================================================

-- Create indexes for full-text search on auctions
CREATE INDEX idx_auctions_title_search ON auctions USING gin(to_tsvector('english', title));
CREATE INDEX idx_auctions_description_search ON auctions USING gin(to_tsvector('english', description));

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE users IS 'Stores user account information and profile data';
COMMENT ON TABLE auctions IS 'Stores auction listings with pricing and timing information';
COMMENT ON TABLE bids IS 'Stores all bids placed on auctions with automatic bid support';
COMMENT ON TABLE watchlist IS 'Stores user watchlist items with notification preferences';
COMMENT ON TABLE notifications IS 'Stores all user notifications with read status';

COMMENT ON COLUMN auctions.reserve_price IS 'Minimum price for auction to be valid (hidden from bidders)';
COMMENT ON COLUMN auctions.buy_now_price IS 'Price at which auction can be purchased immediately';
COMMENT ON COLUMN bids.max_bid IS 'Maximum bid amount for automatic bidding';
COMMENT ON COLUMN bids.is_auto_bid IS 'Indicates if bid was placed automatically by the system';

-- =====================================================
-- END OF MIGRATION
-- =====================================================
