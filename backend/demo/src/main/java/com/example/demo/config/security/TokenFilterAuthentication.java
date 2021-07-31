package com.example.demo.config.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.model.entity.Account;
import com.example.demo.model.repository.AccountRepository;

public class TokenFilterAuthentication extends OncePerRequestFilter {
	
	private TokenService tokenService;
	private AccountRepository accountRepository;
	
	public TokenFilterAuthentication(TokenService tokenService, AccountRepository accountRepository) {
		this.tokenService = tokenService;
		this.accountRepository = accountRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String token = retrieveToken(request);
		boolean isValid = tokenService.isValidToken(token);
		if(isValid) {
			clientAuthenticate(token);
		}
		
		filterChain.doFilter(request, response);
	}

	private void clientAuthenticate(String token) {
		Long userId = tokenService.getUserId(token);
		Account user = accountRepository.findById(userId).get();
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user , null, user.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authentication);	
	}

	private String retrieveToken(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		
		if(token == null || token.isEmpty() || !token.startsWith("Bearer ")) {
			return null;
		}
		
		return token.substring(7, token.length());
	}

}
