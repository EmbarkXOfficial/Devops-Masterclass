package com.example.hello;
import org.springframework.web.bind.annotation.*;
import java.net.InetAddress;
import java.util.Map;
@RestController
public class HelloController {
  @GetMapping("/")
  public Map<String, String> hello() throws Exception {
    String env = System.getenv().getOrDefault("ENV_VALUE", "No env set");
    String hostname = InetAddress.getLocalHost().getHostName();
    
    return Map.of("message", "Hello from Simple App (Spring Boot)", "env", env, "container", hostname);
  }
}
