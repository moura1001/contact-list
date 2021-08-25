package com.example.demo.controller;

import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.repository.AccountRepository;
import com.example.demo.model.repository.ContactRepository;
import com.example.demo.config.security.TokenService;
import com.example.demo.model.dto.ContactDto;
import com.example.demo.model.entity.Account;
import com.example.demo.model.entity.Contact;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
	
	@Autowired
    private AccountRepository accountRepository;
	@Autowired
    private ContactRepository contactRepository;	
	@Autowired
	private TokenService tokenService;
	
	@GetMapping
	//@Cacheable(value = "contactsList")
    public Page<ContactDto> list(@RequestHeader HttpHeaders headers,
								@PageableDefault(page = 0, size = 128)
								@SortDefault.SortDefaults({
							        @SortDefault(sort = "id", direction = Direction.ASC)
							    }) Pageable pagination) {
	    
    	
    	Long accountId = tokenService.retrieveAccountId(headers.get("Authorization").get(0));
    	Page<Contact> contacts = contactRepository.findAllByAccountId(accountId, pagination);
    	//Page<Contact> contacts = contactRepository.findAll(pagination);
    	return ContactDto.convert(contacts);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> get(@RequestHeader HttpHeaders headers, @PathVariable Long id) {
		Long accountId = tokenService.retrieveAccountId(headers.get("Authorization").get(0));
		//Optional<Contact> contact = contactRepository.findById(id);
		Optional<Contact> contact = contactRepository.findByAccountIdAndId(accountId, id);
		if(contact.isPresent()) {
			ContactDto contactDto = new ContactDto(contact.get());
			return new ResponseEntity<ContactDto>(contactDto, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);      
	}
	
	@PostMapping
	@Transactional
	//@CacheEvict(value = "contactsList", allEntries = true)
	public ResponseEntity<?> add(@RequestHeader HttpHeaders headers,
								@RequestBody @Valid ContactDto contact) {
		Long accountId = tokenService.retrieveAccountId(headers.get("Authorization").get(0));
		Optional<Account> account = accountRepository.findById(accountId);
		if(account.isPresent()){
			Contact newContact = contactRepository.save(contact.convert(account.get()));
			contact.setId(newContact.getId());
			return new ResponseEntity<ContactDto>(contact, HttpStatus.CREATED);
		}		
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{id}")
	@Transactional
	//@CacheEvict(value = "contactsList", allEntries = true)
	public ResponseEntity<?> update(@RequestHeader HttpHeaders headers,
									@RequestBody @Valid ContactDto contact, @PathVariable Long id) {
		Long accountId = tokenService.retrieveAccountId(headers.get("Authorization").get(0));
		Optional<Account> account = accountRepository.findById(accountId);
		if(account.isPresent()){
			Optional<Contact> existContact = contactRepository.findByAccountIdAndId(accountId, id);
			if(existContact.isPresent()) {
				contact.setId(id);
				existContact.get().setName(contact.getName());
				existContact.get().setEmail(contact.getEmail());
				existContact.get().setAddress(contact.getAddress());
				existContact.get().setTelephone(contact.getTelephone());
		        contactRepository.save(existContact.get());
		        return new ResponseEntity<ContactDto>(contact, HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{id}")
	@Transactional
	//@CacheEvict(value = "contactsList", allEntries = true)
	public ResponseEntity<?> delete(@RequestHeader HttpHeaders headers,
									@PathVariable Long id) {
		Long accountId = tokenService.retrieveAccountId(headers.get("Authorization").get(0));
		Optional<Account> existAccount = accountRepository.findById(accountId);
		if(existAccount.isPresent()) {
			Optional<Contact> existContact = contactRepository.findByAccountIdAndId(accountId, id);
			if(existContact.isPresent()) {
				contactRepository.deleteById(id);
		        return new ResponseEntity<>(HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);		
	}

}
