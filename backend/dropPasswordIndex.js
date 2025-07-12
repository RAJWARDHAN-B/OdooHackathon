const mongoose = require('mongoose');

// Update the URI if your MongoDB is not local or uses a different database name
const uri = 'mongodb://localhost:27017/test';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', async () => {
  try {
    const indexes = await mongoose.connection.db.collection('users').indexes();
    console.log('Current indexes:', indexes);

    // Try to drop the password_1 index if it exists
    try {
      const result = await mongoose.connection.db.collection('users').dropIndex('password_1');
      console.log('Index dropped:', result);
    } catch (err) {
      console.error('Error dropping index:', err.message);
    }

    // Show indexes after drop attempt
    const afterIndexes = await mongoose.connection.db.collection('users').indexes();
    console.log('Indexes after drop attempt:', afterIndexes);
  } catch (err) {
    console.error('General error:', err.message);
  } finally {
    mongoose.connection.close();
  }
}); 