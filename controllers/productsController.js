const Product = require('../models').Product;

/**
 * Show all products
 * @param req
 * @param res
 * @return Response
 */
exports.product_list = (req, res) => {
	const {query} = req;
	let limitRows = 4;
	let offset = 0;
	let page = 1;
	
	if("page" in query && Number.isInteger(parseInt(query.page)) && parseInt(query.page) > 0){
		page = parseInt(query.page);
		offset = limitRows*(page - 1);
	}
	
	Product.findAndCountAll({ offset: offset, limit: limitRows })
		.then(users => {
			res.json({
				data: users,
				page: page,
				status: "ok"
			})
		})
};

exports.product_show = (req, res) => {
	const {params: {id}} = req;
	
	Product.findById(id)
		.then(user => {
			console.log(user);
			res.json({
				data: user,
				status: "ok"
			});
		})
};

exports.product_update = (req, res) => {
	const {params: {id}} = req;
	
	Product.findOne({ where: { id: id } })
		.then(user => {
			console.log('\x1b[31m',user);
			user.update({...req.body})
				.then(result => {
					console.log(result);
					res.json({
						data: result,
						status: "ok"
					});
				})
		})
};

exports.product_delete = (req, res) => {
	const {params: {id}} = req;
	
	Product.destroy({
			where: {
				id: id
			}
		})
		.then(result => {
			console.log(result);
			res.json({
				data: result,
				status: "ok"
			});
		})
};

exports.product_new = (req, res) => {
	
	req.checkBody('price', 'Price is required').notEmpty();
	req.checkBody('title', 'Title is required').notEmpty().isLength({ min: 5 }).withMessage('Too short Title');
	req.checkBody('description', 'Description is required').notEmpty();
	req.checkBody('image', 'Image is required').notEmpty();
	req.checkBody('amount', 'Amount is required').notEmpty();
	
	const errors = req.validationErrors();
	if(errors){
		console.log(errors);
		return res.status(422).json({ errors: errors });
	}
	else{
		Product.create({...req.body})
			.then(user => {
				console.log(user);
				res.json({
					data: user,
					status: "ok"
				});
			});
	}
	
	
};