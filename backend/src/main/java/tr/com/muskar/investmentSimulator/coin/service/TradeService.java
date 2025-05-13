package tr.com.muskar.investmentSimulator.coin.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.com.muskar.investmentSimulator.coin.CoinGeckoService;
import tr.com.muskar.investmentSimulator.coin.model.Transaction;
import tr.com.muskar.investmentSimulator.coin.model.TransactionType;
import tr.com.muskar.investmentSimulator.coin.model.Wallet;
import tr.com.muskar.investmentSimulator.coin.repository.TransactionRepository;
import tr.com.muskar.investmentSimulator.coin.repository.WalletRepository;
import tr.com.muskar.investmentSimulator.user.User;
import tr.com.muskar.investmentSimulator.user.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final CoinGeckoService coinGeckoService;

    @Transactional
    public void buyCoin(User user, String coinId, double quantity) {
        double coinPrice = coinGeckoService.getCoinPrice(coinId);

        double totalCost = coinPrice * quantity;
        if (user.getBalance() < totalCost) {
            throw new RuntimeException("Yetersiz bakiye");
        }

        user.setBalance(user.getBalance() - totalCost);
        userRepository.save(user);

        Wallet wallet = walletRepository.findByUserAndCoinId(user, coinId)
                .orElse(Wallet.builder().user(user).coinId(coinId).quantity(0).build());

        wallet.setQuantity(wallet.getQuantity() + quantity);
        walletRepository.save(wallet);


        Transaction tx = Transaction.builder()
                .user(user)
                .coinId(coinId)
                .quantity(quantity)
                .priceAtTransaction(coinPrice)
                .timestamp(LocalDateTime.now())
                .type(TransactionType.BUY)
                .build();
        transactionRepository.save(tx);
    }

    @Transactional
    public void sellCoin(User user, String coinId, double quantity) {
        double coinPrice = coinGeckoService.getCoinPrice(coinId);
        double totalRevenue = coinPrice * quantity;

        Wallet wallet = walletRepository.findByUserAndCoinId(user, coinId)
                .orElseThrow(() -> new RuntimeException("Coin bulunamadı"));

        if (wallet.getQuantity() < quantity) {
            throw new RuntimeException("Yetersiz coin miktarı");
        }

        wallet.setQuantity(wallet.getQuantity() - quantity);
        walletRepository.save(wallet);

        user.setBalance(user.getBalance() + totalRevenue);
        userRepository.save(user);

        Transaction tx = Transaction.builder()
                .user(user)
                .coinId(coinId)
                .quantity(quantity)
                .priceAtTransaction(coinPrice)
                .timestamp(LocalDateTime.now())
                .type(TransactionType.SELL)
                .build();
        transactionRepository.save(tx);
    }

    public List<Wallet> getPortfolio(User user) {
        return walletRepository.findByUser(user);
    }
}
