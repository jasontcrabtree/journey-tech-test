function ProductDataRenderer() { }

ProductDataRenderer.prototype.render = function () {
	var nzd = 
		'<table class="table table-striped">'
		+'	<thead>'
		+'		<tr><td colspan="3">Products (NZD)</td></tr>'
		+'		<tr>'
		+'			<td>Name</td>'
		+'			<td>Price</td>'
		+'			<td>Type</td>'
		+'		</tr>'
		+'	</thead>'
		+ '	<tbody>';

	var n = ProductDataConsolidator.get();
	for (var i = 0; i < n.length; i++) {
		nzd +=
			'<tr>'
		+		'<td>' + n[i].name +'</td>'
		+		'<td>' + n[i].price + '</td>'
		+		'<td>' + n[i].type + '</td>'
		+	'</tr>';
	}
	nzd += '</tbody></table>';
	document.getElementById("nzdProducts").innerHTML = nzd;

	var usd =
		'<table class="table table-striped">'
		+ '	<thead>'
		+ '		<tr><td colspan="3">Products (USD)</td></tr>'
		+ '		<tr>'
		+ '			<td>Name</td>'
		+ '			<td>Price</td>'
		+ '			<td>Type</td>'
		+ '		</tr>'
		+ '	</thead>'
		+ '	<tbody>';

	var u = ProductDataConsolidator.getInUSDollars();
	for (var i = 0; i < u.length; i++) {
		usd +=
			'<tr>'
		+		'<td>' + u[i].name + '</td>'
		+		'<td>' + u[i].price + '</td>'
		+		'<td>' + u[i].type + '</td>'
		+ '</tr>';
	}
	usd += '</tbody></table>';
	document.getElementById("usdProducts").innerHTML = usd;

	var euro =
		'<table class="table table-striped">'
		+ '	<thead>'
		+ '		<tr><td colspan="3">Products (Euro)</td></tr>'
		+ '		<tr>'
		+ '			<td>Name</td>'
		+ '			<td>Price</td>'
		+ '			<td>Type</td>'
		+ '		</tr>'
		+ '	</thead>'
		+ '	<tbody>';

	var e = ProductDataConsolidator.getInEuros();
	for (var i = 0; i < e.length; i++) {
		euro +=
			'<tr>'
		+		'<td>' + e[i].name + '</td>'
		+		'<td>' + e[i].price + '</td>'
		+		'<td>' + e[i].type + '</td>'
		+ '</tr>';
	}
	euro += '</tbody></table>';
	document.getElementById("euProducts").innerHTML = euro;
}