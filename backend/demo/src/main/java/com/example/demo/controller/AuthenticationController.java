package com.example.demo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.security.TokenService;
import com.example.demo.model.dto.AccountDto;
import com.example.demo.model.dto.TokenDto;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private TokenService tokenService;
	
	@PostMapping
	public ResponseEntity<?> authenticate(@RequestBody @Valid AccountDto account){
		UsernamePasswordAuthenticationToken loginData = account.convert();
		
		try {
			Authentication authentication = authManager.authenticate(loginData);
			
			String token = tokenService.generateToken(authentication);
			//System.out.println(token);
			//Long userId = tokenService.getUserId(token);
			
			return new ResponseEntity<>(new TokenDto(token, "Bearer"), HttpStatus.OK);
		} catch (AuthenticationException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
