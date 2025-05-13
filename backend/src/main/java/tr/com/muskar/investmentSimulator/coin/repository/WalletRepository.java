package tr.com.muskar.investmentSimulator.coin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.muskar.investmentSimulator.coin.model.Wallet;
import tr.com.muskar.investmentSimulator.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {

    List<Wallet> findByUser(User user);
    Optional<Wallet> findByUserAndCoinId(User user, String coinId);
}
