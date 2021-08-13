package com.example.demo.model.repository;

import static org.junit.Assert.*;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.model.entity.Contact;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class ContactRepositoryTest {
	
	@Autowired
    private ContactRepository contactRepository;

	@Test
	public void deveRetornarTodosOsContatosDoUsuario1() {
		Long id = (long) 1;
		Pageable pagination = PageRequest.of(0, 128, Sort.by("id").descending());		
		Page<Contact> contacts = contactRepository.findAllByAccountId(id, pagination);
		assertFalse(contacts.isEmpty());
		assertEquals(8, contacts.getTotalElements());
		boolean isUsuario1 = contacts.getContent()
				.stream()
				.allMatch(contact -> contact.getAccount().getId() == id);
		assertTrue(isUsuario1);
	}
	
	@Test
	public void deveRetornarOContato1DoUsuario1() {
		Long accountId = (long) 1;
		Long contactId = (long) 1;
		Optional<Contact> contact = contactRepository.findByAccountIdAndId(accountId, contactId);
		assertFalse(contact.isEmpty());
		assertEquals(contactId, contact.get().getId());
		assertEquals(accountId, contact.get().getAccount().getId());
	}

}
