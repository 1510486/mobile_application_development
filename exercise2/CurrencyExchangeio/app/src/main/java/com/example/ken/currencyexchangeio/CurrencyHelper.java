package com.example.ken.currencyexchangeio;

public class CurrencyHelper {

   static   float rate[] = {
            1,
            (float)22774.89,
            (float)0.813749,
            (float)6.29509,
            (float)107.662
    };
    public static int getCurrencyCode(String currency) {
        if(currency.equalsIgnoreCase("USD")) return 0;
        if(currency.equalsIgnoreCase("VND")) return 1;
        if(currency.equalsIgnoreCase("EUR")) return 2;
        if(currency.equalsIgnoreCase("CNY")) return 3;
        if(currency.equalsIgnoreCase("JPY")) return 4;
        return 3;
    }

    public static float getRateCurrency(String currency1, String currency2) {
        return getRate(currency2)/getRate(currency1);
    }
    public static float getRate(String symbol) {
        return rate[getCurrencyCode(symbol)];
    }
}
