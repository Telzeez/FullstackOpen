import mongoose from "mongoose"; 
import 'dotenv/config'; 
import dns from 'node:dns'; 

dns.setServers(['8.8.8.8', '1.1.1.1']);
mongoose.set('strictQuery', true); 

const url = process.env.MONGODB_URI; 

mongoose.connect(url, { family: 4 })
  .then(result => { 
    console.log('connected to MongoDB'); 
  })
  .catch(error => { 
    console.log('Error connecting to mongoDB: ', error.message); 
  });

const phoneSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: true, 
    validate: { 
      validator: function(v) { 
        return v && v.length >= 3; 
      }, 
      message: props => `Person validation failed: name: ${props.value} is too short than the allowed min length`
    } 
  }, 
  number: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) { 
        return /\d{2,3}-\d{6,}/.test(v); 
      }, 
      message: props => `${props.value} is not a valid phone number`
    }
  }
});

phoneSchema.set('toJSON', { 
  transform: (document, returnedObject) => { 
    returnedObject.id = returnedObject._id.toString(); 
    delete returnedObject._id; 
    delete returnedObject.__v; 
  } 
});

export default mongoose.model('Phone', phoneSchema);
