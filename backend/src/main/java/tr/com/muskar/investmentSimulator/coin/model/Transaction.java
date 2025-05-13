package tr.com.muskar.investmentSimulator.coin.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tr.com.muskar.investmentSimulator.user.User;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    private String coinId;

    private double quantity;

    private double priceAtTransaction;

    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private TransactionType type;
}

