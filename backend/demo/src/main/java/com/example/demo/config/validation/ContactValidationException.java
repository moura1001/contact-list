package com.example.demo.config.validation;

public class ContactValidationException {
	private String field;
	private String error;
	
	public ContactValidationException(String field, String error) {
		this.field = field;
		this.error = error;
	}

	public String getField() {
		return field;
	}

	public String getError() {
		return error;
	}
}
