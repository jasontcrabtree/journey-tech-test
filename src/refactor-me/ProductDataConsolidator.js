function ProductDataConsolidator() { }

ProductDataConsolidator.get = function () {
	var l = new LawnmowerRepository().getAll();
	var p = new PhoneCaseRepository().getAll();
	var t = new TShirtRepository().getAll();

	var products = [];

	for (var i = 0; i < l.length; i++) {
		products.push({
			id: l[i].id,
			name: l[i].name,
			price: l[i].price.toFixed(2),
			type: "Lawnmower"
		});
	}

	for (var i = 0; i < p.length; i++) {
		products.push({
			id: p[i].id,
			name: p[i].name,
			price: p[i].price.toFixed(2),
			type: "Phone Case"
		});
	}

	for (var i = 0; i < t.length; i++) {
		products.push({
			id: t[i].id,
			name: t[i].name,
			price: t[i].price.toFixed(2),
			type: "T-Shirt"
		});
	}

	return products;
}

ProductDataConsolidator.getInUSDollars = function () {
	var l = new LawnmowerRepository().getAll();
	var p = new PhoneCaseRepository().getAll();
	var t = new TShirtRepository().getAll();

	var products = [];

	for (var i = 0; i < l.length; i++) {
		products.push({
			id: l[i].id,
			name: l[i].name,
			price: (l[i].price * 0.76).toFixed(2),
			type: "Lawnmower"
		});
	}

	for (var i = 0; i < p.length; i++) {
		products.push({
			id: p[i].id,
			name: p[i].name,
			price: (p[i].price * 0.76).toFixed(2),
			type: "Phone Case"
		});
	}

	for (var i = 0; i < t.length; i++) {
		products.push({
			id: t[i].id,
			name: t[i].name,
			price: (t[i].price * 0.76).toFixed(2),
			type: "T-Shirt"
		});
	}

	return products;
}

ProductDataConsolidator.getInEuros = function () {
	var l = new LawnmowerRepository().getAll();
	var p = new PhoneCaseRepository().getAll();
	var t = new TShirtRepository().getAll();

	var products = [];

	for (var i = 0; i < l.length; i++) {
		products.push({
			id: l[i].id,
			name: l[i].name,
			price: (l[i].price * 0.67).toFixed(2),
			type: "Lawnmower"
		});
	}

	for (var i = 0; i < p.length; i++) {
		products.push({
			id: p[i].id,
			name: p[i].name,
			price: (p[i].price * 0.67).toFixed(2),
			type: "Phone Case"
		});
	}

	for (var i = 0; i < t.length; i++) {
		products.push({
			id: t[i].id,
			name: t[i].name,
			price: (t[i].price * 0.67).toFixed(2),
			type: "T-Shirt"
		});
	}

	return products;
}
