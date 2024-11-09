const mongoose = require('mongoose');
const {Schema} = mongoose;


const blogSchema = new Schema({
    title: { type : String, required: true, unique: true},
    thumbnail: { type : String, required: true},
    description: { type : String, required: true},
    category: { type : String, required: true},
    url:{ type: String, required:true},
    name:{type:String, required:true},
    deleted: { type : Boolean, default: false},
})

const virtualId  = blogSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

blogSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Blog = mongoose.model('Blog',blogSchema)