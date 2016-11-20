class Harvester {
	constructor(form_id){
		this._step = 1;
		this._form_id = form_id;
		this._fields = ['full_name', 'email', 'company', 'company_address'];
		this._elm = $(`#${form_id}`);
	}

	countSteps(){
		return this._elm.find('section').length;
	}

	validate(data){
		const errors = [];
		const validations = {
			full_name: (val) => {
				if(!val || val.split(' ').length < 2){
					errors.push({message: 'Full name is required', field: 'full_name'});
				}
			},
			email: (val) => {
				const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(!val || !email_regex.test(val)){
					errors.push({message: 'Please enter a valid email', field: 'eamil'});
				}
			},
			company: (val) => {
				if(!val){
					errors.push({message: 'The company name is required', field: 'company'});
				}
			},
			company_address: (val) => {}
		};
		// validate each field
		data.forEach((field) => validations[field.name](field.value));
		// respond back with the errors
		return errors;
	}

	getFieldValue(serialized_data, field_name){
		const index = _.findIndex(serialized_data, { name: field_name });
		// if the field is found in the form, return its value
		if(index > -1){
			return serialized_data[index]['value'];
		}
		// otherwise, nothing
		return null;
	}

	nextStep(){
		const current_step = $(`#${this._form_id} #step-${this._step}`);
		// // hide the current step
		current_step
			.css({ 'position': 'absolute' })
			.toggleClass('slideOutDown');
		// increment step counter
		this._step++;
	}

	reset(){
		// destroy the form, remove from DOM
		this._elm.toggleClass('animated zoomOut');
		setTimeout(() => this._elm.remove(), 500);
	}

	validateAjax(data){
		return $.ajax({
			method: 'POST',
			url: '/api/validate-email',
			data: {
				email: this.getFieldValue(data, 'email')
			}
		})
	}

	submitAjax(data){
		// prepare the data into a submittable JSON
		const submission_json = {};
		data.forEach(field => submission_json[field.name] = field.value);
		// build the ajax promise and return it
		return $.ajax({
			method: 'POST',
			url: '/api/inquiries',
			data: submission_json
		})
	}

	submitBasicInfo(_done){
		const data = this._elm.serializeArray();
		const errors = this.validate(data);
		// if there are no basic errors, validate email and domain from backend
		if(errors.length === 0){
			this.validateAjax(data)
				.then((resp) => {
					// make the actual submission if the email is valid
					if(!resp.is_valid){
						return console.error('Email is not valid', resp);
					}
					this.submitAjax(data)
						.then((resp) => {
							this.nextStep();
							_done(resp);
						})
						.catch((submit_err) => {
							return console.error('Failed to submit form', submit_err);
						});
				})
				.catch((err) => {
					return console.error('Failed to validate email', err);
				});
		}else{
			// TODO: show the errors on each field
			console.debug(errors);
		}
	}
};
