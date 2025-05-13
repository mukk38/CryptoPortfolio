package tr.com.muskar.investmentSimulator.coin;

import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CoinGeckoService {

    private final WebClient webClient = WebClient.create("https://api.coingecko.com/api/v3");

    public List<CoinDto> getTopCoins() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/coins/markets")
                        .queryParam("vs_currency", "usd")
                        .queryParam("order", "market_cap_desc")
                        .queryParam("per_page", "10")
                        .queryParam("page", "1")
                        .queryParam("sparkline", "false")
                        .build())
                .retrieve()
                .bodyToFlux(CoinDto.class)
                .collectList()
                .block();
    }

    public double getCoinPrice(String coinId) {
        Map<String, Map<String, Double>> response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/simple/price")
                        .queryParam("ids", coinId)
                        .queryParam("vs_currencies", "usd")
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Map<String, Double>>>() {})
                .block();

        if (response == null || !response.containsKey(coinId)) {
            throw new RuntimeException("CoinGecko'dan fiyat alınamadı: " + coinId);
        }

        return response.get(coinId).get("usd");
    }
}