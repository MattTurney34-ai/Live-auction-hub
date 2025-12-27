import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv. config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1. Create test users
    console.log('1️⃣ Creating test users.. .');
    
    const { data: users, error:  usersError } = await supabase
      .from('profiles')
      .insert([
        {
          id: '00000000-0000-0000-0000-000000000001',
          email: 'seller@example.com',
          username: 'johnseller',
          full_name:  'John Seller',
          bio: 'Professional antique dealer',
          verified: true,
          rating: 4.8
        },
        {
          id: '00000000-0000-0000-0000-000000000002',
          email:  'buyer@example.com',
          username: 'janedoe',
          full_name: 'Jane Doe',
          bio: 'Art collector',
          verified: true,
          rating: 4.9
        }
      ])
      .select();

    if (usersError) {
      console.error('❌ Users error:', usersError. message);
      throw usersError;
    }
    console.log(`✅ Created ${users.length} users\n`);

    // 2. Create test auctions
    console.log('2️⃣ Creating test auctions...');
    
    const now = new Date();
    const nextWeek = new Date(now. getTime() + 7 * 24 * 60 * 60 * 1000);

    const { data: auctions, error: auctionsError } = await supabase
      .from('auctions')
      .insert([
        {
          seller_id: '00000000-0000-0000-0000-000000000001',
          title: 'Vintage Rolex Watch',
          description: 'Beautiful vintage Rolex from the 1960s',
          category: 'Watches',
          item_condition: 'good',
          starting_price: 5000,
          current_price: 5000,
          bid_increment: 250,
          auction_status: 'active',
          start_time: now. toISOString(),
          end_time: nextWeek.toISOString(),
          location:  'New York, NY',
          featured:  true
        },
        {
          seller_id: '00000000-0000-0000-0000-000000000001',
          title: 'First Edition Harry Potter Books',
          description: 'Complete set of first edition Harry Potter books',
          category:  'Books',
          item_condition: 'like_new',
          starting_price:  2500,
          current_price:  2500,
          bid_increment: 100,
          auction_status: 'active',
          start_time: now.toISOString(),
          end_time: nextWeek.toISOString(),
          location: 'London, UK'
        },
        {
          seller_id: '00000000-0000-0000-0000-000000000001',
          title:  '1959 Gibson Les Paul Guitar',
          description: 'Rare vintage guitar in excellent condition',
          category: 'Musical Instruments',
          item_condition: 'good',
          starting_price: 75000,
          current_price:  75000,
          bid_increment: 5000,
          auction_status:  'active',
          start_time: now.toISOString(),
          end_time: nextWeek.toISOString(),
          location: 'Nashville, TN',
          featured: true
        }
      ])
      .select();

    if (auctionsError) {
      console.error('❌ Auctions error:', auctionsError.message);
      throw auctionsError;
    }
    console.log(`✅ Created ${auctions. length} auctions\n`);

    // 3. Create test bids
    console.log('3️⃣ Creating test bids...');
    
    const { data: bids, error: bidsError } = await supabase
      .from('bids')
      .insert([
        {
          auction_id: auctions[1].id,
          bidder_id: '00000000-0000-0000-0000-000000000002',
          amount: 2600
        },
        {
          auction_id: auctions[1]. id,
          bidder_id: '00000000-0000-0000-0000-000000000002',
          amount: 2800
        }
      ])
      .select();

    if (bidsError) {
      console.error('❌ Bids error:', bidsError.message);
      throw bidsError;
    }
    console.log(`✅ Created ${bids.length} bids\n`);

    // 4. Create watchlist
    console.log('4️⃣ Creating watchlist...');
    
    const { data: watchlist, error: watchlistError } = await supabase
      .from('watchlist')
      .insert([
        {
          user_id: '00000000-0000-0000-0000-000000000002',
          auction_id: auctions[0].id
        }
      ])
      .select();

    if (watchlistError) {
      console.error('❌ Watchlist error:', watchlistError.message);
      throw watchlistError;
    }
    console.log(`✅ Created ${watchlist.length} watchlist items\n`);

    // Summary
    console.log('━'. repeat(50));
    console.log('🎉 SEEDING COMPLETE!');
    console.log('━'.repeat(50));
    console.log(`✅ Users: ${users.length}`);
    console.log(`✅ Auctions: ${auctions. length}`);
    console.log(`✅ Bids: ${bids.length}`);
    console.log(`✅ Watchlist: ${watchlist. length}`);
    console.log('━'.repeat(50));

  } catch (error:  any) {
    console.error('\n❌ SEEDING FAILED:', error.message);
    process.exit(1);
  }
}

seedDatabase()
  .then(() => {
    console.log('\n✨ All done! Check your Supabase dashboard.\n');
    process.exit(0);
  })
  .catch(() => process.exit(1));