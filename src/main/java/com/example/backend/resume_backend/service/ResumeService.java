package com.example.backend.resume_backend.service;

import java.io.IOException;

public interface ResumeService {

    String generateResumeResponse(String userResumeDescription) throws IOException;

}
