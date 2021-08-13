package com.example.demo.controller;

import static org.junit.Assert.*;

import java.net.URI;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthenticationControllerTest {

	@Autowired
	private MockMvc mockMvc;
	
	@Test
	public void deveRetornarStatus400QuandoDadosDeAutenticacaoEstiveremIncorretos() {
		try {
			URI uri = new URI("/auth");
			String json = "{\"email\":\"invalid@email.com\",\"password\":\"654321\"}";
			
			mockMvc
			.perform(MockMvcRequestBuilders
					.post(uri)
					.content(json)
					.contentType(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers
					.status()
					.is(HttpStatus.BAD_REQUEST.value()));
		} catch (Exception e) {
			fail("Test failed: " + e.getMessage());
		}
	}
	
	@Test
	public void deveRetornarStatus200QuandoDadosDeAutenticacaoEstiveremCorretos() {
		try {
			URI uri = new URI("/auth");
			String json = "{\"email\":\"account@email.com\",\"password\":\"147258\"}";
			
			mockMvc
			.perform(MockMvcRequestBuilders
					.post(uri)
					.content(json)
					.contentType(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers
					.status()
					.is(HttpStatus.OK.value()));
		} catch (Exception e) {
			fail("Test failed: " + e.getMessage());
		}
	}

}
