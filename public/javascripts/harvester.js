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

	showFieldError(field_id, message){
		const field_input = $(this._elm.find($(`#${field_id}`))[0]);
		field_input.addClass('invalid');
		// TODO: show message for that field
	}

	validate(data){
		const errors = [];
		const validations = {
			full_name: (val) => {
				if(!val || val.split(' ').length < 2){
					this.showFieldError('full_name');
					errors.push({field: 'full_name'});
				}
			},
			email: (val) => {
				const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(!val || !email_regex.test(val)){
					this.showFieldError('email');
					errors.push({field: 'eamil'});
				}
			},
			company: (val) => {
				if(!val){
					this.showFieldError('company');
					errors.push({field: 'company'});
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

	setFieldValue(field, value){
		$(`#${this._form_id} #${field}`).val(value).focus();
	}

	nextStep(){
		const current_step = $(`#${this._form_id} #step-${this._step}`);
		// // hide the current step
		current_step.hide();
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
		// fetch the form data and apply client side validation
		const data = this._elm.serializeArray();
		const errors = this.validate(data);
		// if there are no basic errors, validate email and domain from backend
		if(errors.length === 0){
			this.validateAjax(data)
				.then((resp) => {
					if(!resp.is_valid){
						// show error under email input
						this.showFieldError('email', resp.message);
						return _done(resp);
					}
					// make the actual submission if the email is valid
					this.submitAjax(data)
						.then((resp) => {
							this.nextStep();
							_done(null, resp);
						})
						.catch((submit_err) => {
							_done(submit_err);
							return console.error('Failed to submit form', submit_err);
						});
				})
				.catch((err) => {
					_done(err);
					return console.error('Failed to validate email', err);
				});
		}
		debugger;
		return _done(errors);
	}
};
