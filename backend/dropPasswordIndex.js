const mongoose = require('mongoose');

// Update the URI to use the correct database name
const uri = 'mongodb://localhost:27017/skillswap';

mongoose.connect(uri);

mongoose.connection.once('open', async () => {
  try {
    console.log('Connected to MongoDB');
    
    // Check if the users collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const usersCollectionExists = collections.some(col => col.name === 'users');
    
    if (!usersCollectionExists) {
      console.log('Users collection does not exist yet. No indexes to clean up.');
      return;
    }
    
    const indexes = await mongoose.connection.db.collection('users').indexes();
    console.log('Current indexes:', indexes.map(idx => idx.name));

    // Try to drop the password_1 index if it exists
    try {
      const result = await mongoose.connection.db.collection('users').dropIndex('password_1');
      console.log('Successfully dropped password_1 index:', result);
    } catch (err) {
      if (err.code === 26) {
        console.log('password_1 index does not exist, nothing to drop');
      } else {
        console.error('Error dropping password_1 index:', err.message);
      }
    }

    // Show indexes after drop attempt
    const afterIndexes = await mongoose.connection.db.collection('users').indexes();
    console.log('Indexes after drop attempt:', afterIndexes.map(idx => idx.name));
    
    console.log('Index cleanup completed successfully');
  } catch (err) {
    console.error('General error:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}); 