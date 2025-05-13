package tr.com.muskar.investmentSimulator.coin;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coins")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CoinController {

    private final CoinGeckoService coinService;

    @GetMapping
    public List<CoinDto> getCoins() {
        return coinService.getTopCoins();
    }
}
