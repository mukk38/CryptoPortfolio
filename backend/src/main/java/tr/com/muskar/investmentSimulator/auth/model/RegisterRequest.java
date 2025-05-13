package tr.com.muskar.investmentSimulator.auth.model;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
}

