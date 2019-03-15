const Product = require('../models').Product;
const CartItem = require('../models').CartItem;

exports.card_list = (req, res) => {
	const {params: {userId}} = req;

	CartItem.findAll({
		where: { userId: userId },
		include: [{
			model: Product,
		}]
	})
		.then(function(data) {
			console.log(JSON.stringify(data));
			res.json({
				data: data,
				status: "ok"
			});
		});
};