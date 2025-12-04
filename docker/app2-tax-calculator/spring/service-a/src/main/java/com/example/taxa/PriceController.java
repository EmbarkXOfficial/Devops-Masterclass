package com.example.taxa;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.InetAddress;
import java.util.Map;

@RestController
public class PriceController {

    private final RestTemplate rest = new RestTemplate();
    private final String taxServiceUrl = System.getenv().getOrDefault(
            "TAX_SERVICE_URL",
            "http://service-b:4000"   // fallback for local testing ONLY
    );

    @GetMapping("/price")
    public Map<String, Object> price(@RequestParam double amount,
                                     @RequestParam String country) throws Exception {

        Map taxResponse = rest.getForObject(
                taxServiceUrl + "/tax?country=" + country,
                Map.class
        );

        double tax = Double.parseDouble(taxResponse.get("tax").toString());
        double total = amount + tax;

        String hostname = InetAddress.getLocalHost().getHostName();

        return Map.of(
                "service", "A",
                "amount", amount,
                "tax", tax,
                "total", total,
                "container", hostname,
                "service_b_container", taxResponse.get("container")
        );
    }
}
