package com.example.demo.model.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.springframework.data.domain.Page;

import com.example.demo.model.entity.Account;
import com.example.demo.model.entity.Contact;

public class ContactDto {

	private Long id;
	
	@NotNull @NotEmpty @Length(min=3, max=128)
	@Pattern(regexp="^([A-Za-z0-9]+\\s?)+$")
	private String name;
	
	@NotNull @NotEmpty @Length(min=3, max=128)
	@Pattern(regexp="^([\\._]*[A-Za-z0-9]+[\\._]*)@[A-Za-z0-9]+\\.(com|org|br)$")
	private String email;
	
	@NotNull @NotEmpty @Length(min=3, max=128)
	@Pattern(regexp="^([A-Za-z0-9]+\\s?)+,?\\s?([A-Za-z0-9]+\\s?)*$")
	private String address;
	
	@NotNull @NotEmpty @Length(min=8, max=16)
	@Pattern(regexp="^([0-9]+)$")
	private String telephone;
	
	public ContactDto(){}
	
	public ContactDto(Contact contact) {
		this.id = contact.getId();
		this.name = contact.getName();
		this.email = contact.getEmail();
		this.address = contact.getAddress();
		this.telephone = contact.getTelephone();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
	public static Page<ContactDto> convert(Page<Contact> contacts){
		return contacts.map(ContactDto::new);
	}
	
	public Contact convert(Account account){
		return new Contact(name, email, address, telephone, account);
	}
}
