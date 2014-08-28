// Purchase object
function Achat(typeOp, locale, montant){
	this.typeOp = typeOp
	this.locale = locale
	this.montant = montant
}

//Public methods

// Calculate notary compensation
Achat.prototype.calculerEmolument = function(){
	// Set minimum to 87.31
	var emolument = 87.31

	// Initialize amount variables at 0
	var montantAudelaSoixanteMille = 0,
	montantEntreDixSeptMilleSoixanteMille = 0,
	montantEntreSixMilleCinqCentEtDixSeptMille = 0,
	montantSousSixMilleCinqCent = 0

	// Initialize fee variables at 0
	var fraisTauxMax = 0,
	fraisTauxGrand = 0,
	fraisTauxPetit = 0,
	fraisTauxMin = 0

	// Calculate amount of money to tax at each rate
	if(this.montant > 60000){
		montantAudelaSoixanteMille = this.montant - 60000
		var fraisTauxMax = montantAudelaSoixanteMille * (.9867/100)
	}

	if(this.montant > 17000){
		montantEntreDixSeptMilleSoixanteMille = this.montant - 17000 - montantAudelaSoixanteMille
		var fraisTauxGrand = montantEntreDixSeptMilleSoixanteMille * (1.3156/100)
	}

	if(this.montant > 6500){
		montantEntreSixMilleCinqCentEtDixSeptMille = this.montant - 6500 - montantEntreDixSeptMilleSoixanteMille - montantAudelaSoixanteMille
		var fraisTauxPetit = montantEntreSixMilleCinqCentEtDixSeptMille * (1.9734/100)
	}

	montantSousSixMilleCinqCent = this.montant - montantEntreSixMilleCinqCentEtDixSeptMille - montantEntreDixSeptMilleSoixanteMille - montantAudelaSoixanteMille
	var fraisTauxMin = montantSousSixMilleCinqCent * (4.784/100)

	// Add up total fees
	var fraisTotal = fraisTauxMin + fraisTauxPetit + fraisTauxGrand + fraisTauxMax

	// If total fees are greater than minimum, return total fees; else return minimum
	return fraisTotal > emolument ? fraisTotal : emolument
}

// Calculate registration fees
Achat.prototype.calculerDroits = function(){
	// If property type is not new, fee changes according to location
	if(this.typeOp != "neuf"){
		switch(this.locale){
			case "reunion":
			case "guadeloup":
			case "guyane":
			case "36":
			case "38":
			case "44":
			case "53":
			case "56":
			case "75":
			case "78":
			case "86":
				droits = 5.09/100
				break
			default:
				droits = 5.79/100
		}
	}
	// Property is new, provide fixed rate
	else{
		droits = 0.715/100
	}
	// Return rate
	return droits
}

// Calculate total
Achat.prototype.calculerTotal = function(){
	// 1000 euro fixed fee
	fixe = 1000
	publication = this.montant * (0.1/100)
	return this.calculerEmolument() + fixe + publication + (this.montant * this.calculerDroits())
}

// Formatting functions
function commasToPoints(number){
	number_array = number.split('')
	for (var i = 0, n = number_array.length; i < n; i++) {
		if(number_array[i] === ','){
			number_array[i] = '.'
		}
	}
	return number_array.join('')
}

function pointsToCommas(number){
	number_array = number.toString().split('')
	for (var i = 0, n = number_array.length; i < n; i++) {
		if(number_array[i] === '.'){
			number_array[i] = ','
		}
	}
	return number_array.join('')
}

function moneyRound(num){
	return parseFloat(Math.ceil(num * 100) / 100).toFixed(2);
	
}