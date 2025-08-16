package com.example.backend.resume_backend;

import com.example.backend.resume_backend.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class ResumeBackendApplicationTests {

	@Autowired
	private ResumeService resumeService;

	@Test
	void contextLoads() throws IOException {
		resumeService.generateResumeResponse("I am Anshul Bhaskar with 2 years of Java Experience");
	}

}
