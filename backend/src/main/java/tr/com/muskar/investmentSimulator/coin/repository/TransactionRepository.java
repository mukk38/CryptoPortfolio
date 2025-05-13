package tr.com.muskar.investmentSimulator.coin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.muskar.investmentSimulator.coin.model.Transaction;
import tr.com.muskar.investmentSimulator.user.User;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserOrderByTimestampDesc(User user);
}
