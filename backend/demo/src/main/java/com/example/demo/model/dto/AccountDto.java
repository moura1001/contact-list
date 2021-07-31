package com.example.demo.model.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.example.demo.model.entity.Account;

public class AccountDto {

	@NotNull @NotEmpty @Length(min=3, max=128)
	@Pattern(regexp="^([\\._]*[A-Za-z0-9]+[\\._]*)@[A-Za-z0-9]+\\.(com|org|br)$")
	private String email;
	
	@NotNull @NotEmpty @Length(min=4, max=128)
	@Pattern(regexp="^([A-Za-z0-9]+)$")
	private String password;
	
	public AccountDto(){}
	
	public AccountDto(Account account) {
		this.email = account.getEmail();
		this.password = account.getPassword();
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public UsernamePasswordAuthenticationToken convert() {
		return new UsernamePasswordAuthenticationToken(email, password);
	}
	
	public Account convert2(){
		return new Account(email, password);
	}
	
	public AccountDto convert(Account account){
		return new AccountDto(account);
	}
	
}
