package com.example.demo.model.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

	Page<Contact> findAllByAccountId(Long id, Pageable pagination);
	
	@Query("SELECT c FROM Contact c WHERE c.account.id = :accountId AND c.id = :id")
	Optional<Contact> findByAccountIdAndId(Long accountId, Long id);
	
	void deleteAllByAccountId(Long id);
}
