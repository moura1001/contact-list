package com.example.demo.controller;

import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.security.TokenService;
import com.example.demo.model.dto.AccountDto;
import com.example.demo.model.entity.Account;
import com.example.demo.model.repository.AccountRepository;
import com.example.demo.model.repository.ContactRepository;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
	
	@Autowired
    private AccountRepository accountRepository;
	@Autowired
    private ContactRepository contactRepository;
	@Autowired
	private TokenService tokenService;	
	@Autowired
	private PasswordEncoder bCrypt;
	
	@PostMapping
	public ResponseEntity<?> add(@RequestBody @Valid AccountDto account){
		Optional<Account> existAccount = accountRepository.findByEmail(account.getEmail());
		
		if(!existAccount.isPresent()){
			Account newAccount = new Account();
			newAccount.setEmail(account.getEmail());
			newAccount.setPassword(bCrypt.encode(account.getPassword()));
			accountRepository.save(newAccount);
			return new ResponseEntity<AccountDto>(account.convert(newAccount), HttpStatus.CREATED);
		}		
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@DeleteMapping
	@Transactional
	public ResponseEntity<?> delete(@RequestHeader HttpHeaders headers) {
		Long accountId = tokenService.retrieveAccountId(headers.get("Authorization").get(0));		
		Optional<Account> existAccount = accountRepository.findById(accountId);
		
		if(existAccount.isPresent()) {
			contactRepository.deleteAllByAccountId(accountId);
			accountRepository.deleteById(accountId);
		    return new ResponseEntity<>(HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);		
	}
}
