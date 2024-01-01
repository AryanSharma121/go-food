const mongoose = require('mongoose');
const mongoURI = 'mongodb://aryan121:Iwmo.e3@ac-m2jokit-shard-00-00.uryvvgo.mongodb.net:27017,ac-m2jokit-shard-00-01.uryvvgo.mongodb.net:27017,ac-m2jokit-shard-00-02.uryvvgo.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-10diqz-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = async () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        if (err) {
            console.log("---", err);
        } else {
            console.log("connected");

            try {
                const foodCategoryData = await mongoose.connection.collection("food_category").find({}).toArray();
                const foodItemsData = await mongoose.connection.collection("food_items").find({}).toArray();

                global.food_items = foodItemsData;
                global.food_category = foodCategoryData;

                console.log('Data fetched successfully:', global.food_items, global.food_category);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    });
}

module.exports = mongoDB;
