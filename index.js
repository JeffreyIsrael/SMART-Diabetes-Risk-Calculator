(function() {
    var repository;
	var server = sessionStorage.getItem('server');
	var pid = sessionStorage.getItem('patientid');
	
	function PatientRepository() {
        this._client = FHIR.client({
            serviceUrl: server,
            auth: {
                type: 'none'
            }
        });
    }
	
	PatientRepository.prototype.getPatientDemographics = function() {
        return this._client.api.search({
            type: 'Patient',
            query: {
                _id: [pid]
            }
        }).then(function(result) {
            return result.data.entry.map(function(entry) {
                return new Demographics(entry);
            });
        });
    }
	
    PatientRepository.prototype.getObservationsByName = function(name) {
        return this._client.api.search({
            type: 'Observation',
            query: {
                name: name,
                patientId: [pid]
            }
        }).then(function(result) {
            return result.data.entry.map(function(entry) {
                return new Observation(entry);
            });
        });
    }

	Observation.prototype.compare = function(other) {
        if (this.date > other.date) {
            return -1;
        }

        if (this.date < other.date) {
            return 1;
        }

        return 0;
    };
    
	function Demographics(entry) {
        this.given = entry.content.name[0].given.join(' ');
        this.family = entry.content.name[0].family.join(' ');
		this.gender = entry.content.gender.coding[0].display;
		this.dob = entry.content.birthDate;
    }
	
    function Observation(entry) {
        this.date = entry.content.appliesDateTime;
        this.name = entry.content.name.coding[0].display;
        this.value = entry.content.valueQuantity.value;
		this.units = entry.content.valueQuantity.units;
    }
	
    repository = new PatientRepository();
	
	
	// Get patient demographic information
	repository.getPatientDemographics()
        .then(function(demographics) {
			var b = new Date(demographics[0].dob);
			var d = Date.now() - b;
			var a = new Date(d);
			var age = Math.abs(a.getUTCFullYear() - 1970);
			
			patient.setAge(age);
			
			if(demographics[0].gender == "Male"){
				patient.setGender(1);
			} else{
				patient.setGender(0);
			}
			
			document.getElementById('patient_name').innerHTML = demographics[0].given + " " + demographics[0].family;
			document.getElementById('patient_gender').innerHTML = demographics[0].gender;
			document.getElementById('patient_age').innerHTML = age;
			document.getElementById('patient_dob').innerHTML = demographics[0].dob;
        });
		
	// Get latest systolic blood pressure reading
	repository.getObservationsByName('8480-6')
        .then(function(observations) {
           	observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setSystolic(observations[0].value);
			$("#systolic").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_systolic_value').innerHTML = observations[0].value;
			document.getElementById('observations_systolic_units').innerHTML = observations[0].units;
        });
		
	// Get latest diastolic blood pressure reading
	repository.getObservationsByName('8462-4')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setDiastolic(observations[0].value);
			$("#diastolic").data("ionRangeSlider").update({ from: observations[0].value });
						
			document.getElementById('observations_diastolic_value').innerHTML = observations[0].value;
			document.getElementById('observations_diastolic_units').innerHTML = observations[0].units;
        });
		
		
	// Get latest total cholesterol reading
	repository.getObservationsByName('2093-3')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setTotalCholesterol(observations[0].value);
			$("#total_cholesterol").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_total_cholesterol_value').innerHTML = observations[0].value;
			document.getElementById('observations_total_cholesterol_units').innerHTML = observations[0].units;
        });

	// Get latest ldl cholesterol reading
	repository.getObservationsByName('18262-6')
        .then(function(observations) {
			observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setLDL(observations[0].value);
			$("#ldl").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_ldl_cholesterol_value').innerHTML = observations[0].value;
			document.getElementById('observations_ldl_cholesterol_units').innerHTML = observations[0].units;
        });

	// Get latest hdl cholesterol reading
	repository.getObservationsByName('2085-9')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setHDL(observations[0].value);
			$("#hdl").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_hdl_cholesterol_value').innerHTML = observations[0].value;
			document.getElementById('observations_hdl_cholesterol_units').innerHTML = observations[0].units;
        });		

	// Get latest triglycerides reading
	repository.getObservationsByName('2571-8')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setTriglycerides(observations[0].value);
			$("#triglycerides").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_triglycerides_value').innerHTML = observations[0].value;
			document.getElementById('observations_triglycerides_units').innerHTML = observations[0].units;
        });	

	// Get latest height reading
	repository.getObservationsByName('8302-2')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setHeight(observations[0].value);
			
			document.getElementById('observations_height_value').innerHTML = observations[0].value;
			document.getElementById('observations_height_units').innerHTML = observations[0].units;
        });	
		
	// Get latest weight reading
	repository.getObservationsByName('3141-9')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setWeight(observations[0].value);
			$("#weight").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_weight_value').innerHTML = observations[0].value;
			document.getElementById('observations_weight_units').innerHTML = observations[0].units;
        });		

	// Get latest bmi reading
	repository.getObservationsByName('39156-5')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setBMI(observations[0].value);
			$("#bmi").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_bmi_value').innerHTML = observations[0].value;
			document.getElementById('observations_bmi_units').innerHTML = observations[0].units;
        });	

	// Get latest a1c reading
	repository.getObservationsByName('4548-4')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setA1C(observations[0].value);	
			$("#a1c").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_a1c_value').innerHTML = observations[0].value;
			document.getElementById('observations_a1c_units').innerHTML = observations[0].units;
		});	
		
	// Get latest glucose reading
	repository.getObservationsByName('2345-7')
        .then(function(observations) {
            observations.sort(function(x, y) { return x.compare(y); });
			
			patient.setGlucose(observations[0].value);
			$("#glucose").data("ionRangeSlider").update({ from: observations[0].value });
			
			document.getElementById('observations_glucose_value').innerHTML = observations[0].value;
			document.getElementById('observations_glucose_units').innerHTML = observations[0].units;
        });
	
	
	
	
	
	
})();