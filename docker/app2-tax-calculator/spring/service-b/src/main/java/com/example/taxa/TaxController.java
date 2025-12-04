package com.example.taxa;

import org.springframework.web.bind.annotation.*;
import java.net.InetAddress;
import java.util.Map;

@RestController
public class TaxController {

    @GetMapping("/tax")
    public Map<String, Object> tax(@RequestParam String country) throws Exception {
        int tax = switch (country.toUpperCase()) {
            case "IN" -> 18;
            case "US" -> 8;
            case "EU" -> 20;
            default -> 10;
        };

        String hostname = InetAddress.getLocalHost().getHostName();

        return Map.of(
                "service", "B",
                "country", country,
                "tax", tax,
                "container", hostname
        );
    }
}
