function Patient(){
		this.age;
		this.gender;
		this.height;
		this.weight;
		this.bmi;
		this.systolic;
		this.diastolic;
		this.total_cholesterol;
		this.hdl;
		this.ldl;
		this.triglycerides;
		this.a1c;
		this.glucose;	
	}
	
	Patient.prototype.calculateDiabetesRisk = function(){
		// p = (e^(B0+B1*x1+...Bn*xn))/(1+e^(B0+B1*x1+...Bn*xn))

		prob = math.eval(math.pow(math.e,math.eval(-21.4046+
											 (-1.2839*this.gender)+
											 (0.0622*this.age)+
											 (0.1383*this.bmi)+
											 (0.082*this.systolic)+
											 (0.0007*this.diastolic)+
											 (-0.0245*this.total_cholesterol)+
											 (-0.077*this.hdl)+
											 (0.0021*this.ldl)+
											 (0.0037*this.triglycerides)+
											 (0.9495*this.a1c)+
											 (0.0773*this.glucose)))	
			/math.eval(1+ math.pow(math.e,math.eval(-21.4046+
											 (-1.2839*this.gender)+
											 (0.0622*this.age)+
											 (0.1383*this.bmi)+
											 (0.082*this.systolic)+
											 (0.0007*this.diastolic)+
											 (-0.0245*this.total_cholesterol)+
											 (-0.077*this.hdl)+
											 (0.0021*this.ldl)+
											 (0.0037*this.triglycerides)+
											 (0.9495*this.a1c)+
											 (0.0773*this.glucose)))));
		per = math.eval(prob * 100);
		risk = math.round(per, 1);
		return risk;
	}
	
	Patient.prototype.calculatePrediabetesRisk = function(){
		// p = (e^(B0+B1*x1+...Bn*xn))/(1+e^(B0+B1*x1+...Bn*xn))
		
		prob = math.eval(math.pow(math.e,math.eval(-36.6337+
											 (-0.8606*this.gender)+
											 (0.049*this.age)+
											 (0.0758*this.bmi)+
											 (0.0161*this.systolic)+
											 (0.0002*this.diastolic)+
											 (0.0623*this.total_cholesterol)+
											 (-0.0659*this.hdl)+
											 (-0.0275*this.ldl)+
											 (0.0155*this.triglycerides)+
											 (1.8792*this.a1c)+
											 (0.1647*this.glucose)))	
			/math.eval(1+ math.pow(math.e,math.eval(-36.6337+
											 (-0.8606*this.gender)+
											 (0.049*this.age)+
											 (0.0758*this.bmi)+
											 (0.0161*this.systolic)+
											 (0.0002*this.diastolic)+
											 (0.0623*this.total_cholesterol)+
											 (-0.0659*this.hdl)+
											 (-0.0275*this.ldl)+
											 (0.0155*this.triglycerides)+
											 (1.8792*this.a1c)+
											 (0.1647*this.glucose)))));
											 
		per = math.eval(prob * 100);
		risk = math.round(per, 1);
		return risk;
	}
	Patient.prototype.calculateBMI = function(){
		this.bmi = math.eval(this.weight/(math.pow(math.eval(0.01*this.height),2)));
		$("#bmi").data("ionRangeSlider").update({ from: this.bmi });
		this.printRisk();
	}
	
	Patient.prototype.calculateWeight = function(){
		this.weight = math.eval(this.bmi*(math.pow(math.eval(0.01*this.height),2)));
		$("#weight").data("ionRangeSlider").update({ from: this.weight });
		this.printRisk();
	}
	
	Patient.prototype.setAge = function(value) {
		this.age = value;
		this.printRisk();
	}
	Patient.prototype.setGender = function(value) {
		this.gender = value;
		this.printRisk();
	}
	Patient.prototype.setHeight = function(value) {
		this.height = value;
	}
	Patient.prototype.setWeight = function(value) {
		this.weight = value;
	}	
	Patient.prototype.setBMI = function(value) {
		this.bmi = value;
		this.printRisk();
	}
	Patient.prototype.setSystolic = function(value) {
		this.systolic = value;
		this.printRisk();
	}
	Patient.prototype.setDiastolic = function(value) {
		this.diastolic = value;
		this.printRisk();
	}
	Patient.prototype.setTotalCholesterol = function(value) {
		this.total_cholesterol = value;
		this.printRisk();
	}
	Patient.prototype.setHDL = function(value) {
		this.hdl = value;
		this.printRisk();
	}
	Patient.prototype.setLDL = function(value) {
		this.ldl = value;
		this.printRisk();
	}
	Patient.prototype.setTriglycerides = function(value) {
		this.triglycerides = value;
		this.printRisk();
	}
	Patient.prototype.setGlucose = function(value) {
		this.glucose = value;
		this.printRisk();
	}
	Patient.prototype.setA1C = function(value) {
		this.a1c = value;
		this.printRisk();
	}
		
	
	Patient.prototype.printRisk = function(){
		if(this.age === undefined || this.gender === undefined || this.bmi === undefined || this.systolic === undefined  || this.diastolic === undefined || this.total_cholesterol === undefined || this.hdl === undefined || !this.ldl === undefined || this.triglycerides === undefined || this.a1c === undefined || this.glucose === undefined) return;
		var cpr = this.calculatePrediabetesRisk();
		var cdr = this.calculateDiabetesRisk();
			
		document.getElementById('prediabetes_risk').innerHTML = cpr;
		document.getElementById('diabetes_risk').innerHTML = cdr;
			
		if(cpr >= 61){
			prediabetesRiskLevel = "High Risk";
			document.getElementById('prediabetes_risk_box').className="panel panel-red";
		} else if(cpr < 61 && cpr >= 41){
			prediabetesRiskLevel = "Moderate Risk";
			document.getElementById('prediabetes_risk_box').className="panel panel-yellow";
		} else {
			prediabetesRiskLevel = "Low Risk";
			document.getElementById('prediabetes_risk_box').className="panel panel-green";
		}
			
		if(cdr >= 61){
			diabetesRiskLevel = "High Risk";
			document.getElementById('diabetes_risk_box').className="panel panel-red";
		} else if(cdr < 61 && cdr >= 41){
			diabetesRiskLevel = "Moderate Risk";
			document.getElementById('diabetes_risk_box').className="panel panel-yellow";
		} else {
			diabetesRiskLevel = "Low Risk";
			document.getElementById('diabetes_risk_box').className="panel panel-green";
		}
			
		document.getElementById('prediabetes_risk_level').innerHTML = prediabetesRiskLevel;
		document.getElementById('diabetes_risk_level').innerHTML = diabetesRiskLevel;
		
	}

	patient = new Patient();