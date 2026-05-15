import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function testRawDelete() {
  try {
    const res = await pool.query('SELECT id, name FROM "School" LIMIT 1');
    if (res.rows.length === 0) {
      console.log('No schools found.');
      return;
    }
    const school = res.rows[0];
    console.log(`Attempting to delete school: ${school.name} (${school.id})`);
    
    await pool.query('DELETE FROM "School" WHERE id = $1', [school.id]);
    console.log('Delete successful!');
  } catch (error: any) {
    console.error('Delete failed with error:', error.message);
    if (error.detail) console.error('Detail:', error.detail);
  } finally {
    await pool.end();
  }
}

testRawDelete();
