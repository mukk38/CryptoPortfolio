package tr.com.muskar.investmentSimulator.coin;

import lombok.Data;

@Data
public class CoinDto {
    private String id;
    private String symbol;
    private String name;
    private double current_price;
    private double price_change_percentage_24h;
    private String image;
}
