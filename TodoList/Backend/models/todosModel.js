import mongoose from 'mongoose';


const todosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'This field is required']
    },
    description: {
        type: String,
        required: [true, 'This field is required'] // Consistent capitalization
    },
    date: {
        type: Date,
        required: false // Optional field; you can specify if required
    },
    assignedTo: {
        type: String,
        required: false // Optional field; you can specify if required
    }
},{timestamps:true});

const todoCollection = mongoose.model('Todos', todosSchema);
export default todoCollection;