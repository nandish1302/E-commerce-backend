package com.nandish.ecommerce.util;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
@Component
public class JwtUtil { // secret sign and verify token . its a stamp used to approve to prove the token
    private static final String SECRET = "nandish-secret-key-must-be-32-chars!!"; // this is your app's private password used to sign the token. Only your server knows it.
    private static final long EXPIRY = 1000 * 60 * 60 ; //1 HOUR ;
    private static final Key key =Keys.hmacShaKeyFor(SECRET.getBytes()); // this converts secret string into crytography
    public String generateToken(String email ){
        return Jwts.builder()
                .setSubject(email)  // bakes the useremail into the token
                .setIssuedAt(new Date()) // stamps when the token was created
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRY)) // stamps when it dies
                .signWith(key , SignatureAlgorithm.HS256) // signs with secrey key so no one can fake it
                .compact(); // packages everything to one single final token string
        //when we call generate token it return this " eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYW5kaXNoQGdtYWlsLmNvbSJ9.xyz123"
    }
    public String extractEmail(String token ){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    public boolean isTokenValid(String token){
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)  // use secret to verifytoken
                    .build()
                    .parseClaimsJws(token);  // open the token and read it ..
            return true;
        }catch (Exception e ){
            return false;
        }
    }

}
