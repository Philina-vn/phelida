package by.philina.phelida.statistics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    public Statistics findStatistics() {
        return statisticsRepository.findById(1L)
                .orElseThrow();
    }

    public void incrementUsersNum() {
        Statistics statistics = findStatistics();
        statistics.setUsersNum(statistics.getUsersNum() + 1);
        statisticsRepository.save(statistics);
    }

    public void incrementOrdersNum() {
        Statistics statistics = findStatistics();
        statistics.setOrdersNum(statistics.getOrdersNum() + 1);
        statisticsRepository.save(statistics);
    }

    public void incrementProductsNum() {
        Statistics statistics = findStatistics();
        statistics.setProductsNum(statistics.getProductsNum() + 1);
        statisticsRepository.save(statistics);
    }
}
