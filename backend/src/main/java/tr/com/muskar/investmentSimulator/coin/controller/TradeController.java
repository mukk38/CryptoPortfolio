package tr.com.muskar.investmentSimulator.coin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tr.com.muskar.investmentSimulator.coin.model.Wallet;
import tr.com.muskar.investmentSimulator.coin.service.TradeService;
import tr.com.muskar.investmentSimulator.user.User;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/trade")
@RequiredArgsConstructor
public class TradeController {

    private final TradeService tradeService;

    @GetMapping("/portfolio")
    public List<Wallet> getPortfolio(@AuthenticationPrincipal User user) {
//        System.out.println("Authenticated user: " + principal.getName());
//        return null;
        return tradeService.getPortfolio(user);
    }

    @PostMapping("/buy")
    public ResponseEntity<String> buyCoin(@AuthenticationPrincipal User user,
                                          @RequestParam String coinId,
                                          @RequestParam double quantity) {
        try {
            tradeService.buyCoin(user, coinId, quantity);
            return ResponseEntity.ok("Coin başarıyla alındı.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hata: " + e.getMessage());
        }
    }

    @PostMapping("/sell")
    public ResponseEntity<String> sellCoin(@AuthenticationPrincipal User user,
                                           @RequestParam String coinId,
                                           @RequestParam double quantity) {
        try {
            tradeService.sellCoin(user, coinId, quantity);
            return ResponseEntity.ok("Coin başarıyla satıldı.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hata: " + e.getMessage());
        }
    }


}

