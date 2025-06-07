import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },

    items : {
        type : Array,
        required : true,
    },

    address : {
        type : Object,
        required : true,
    },

    amount : {
        type : Number,
        required: true,
    },

    status : {
        type : String,
        required : true,
        default : 'Order Placed',
    },

    PaymentMethod : {
        type : String,
        required : true,
    },

    Payment : {
        type : Boolean,
        required : true,
        default : false,
    },

    date : {
        type : String,
        required : true,
    }

});

const ordermodel = mongoose.models.order || mongoose.model('order', orderSchema);

export default ordermodel;