package com.example.ken.currencyexchangeio;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private Spinner spinner1, spinner2;
    private Button btnSubmit;
    private EditText mEdit;
    private TextView currencyHolder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        addListenerOnButton();
        addListenerOnSpinnerItemSelection();
        addListenerOnSpinnerItemSelection2();
    }

    public void addListenerOnSpinnerItemSelection() {
        spinner1 = (Spinner) findViewById(R.id.spinner1);
        spinner1.setOnItemSelectedListener(new SelectEventHandler());
    }
    public void addListenerOnSpinnerItemSelection2() {
        spinner2 = (Spinner) findViewById(R.id.spinner2);
        spinner2.setOnItemSelectedListener(new SelectEventHandler());
    }

    // get the selected dropdown list value
    public void addListenerOnButton() {

        spinner1 = (Spinner) findViewById(R.id.spinner1);
        spinner2 = (Spinner) findViewById(R.id.spinner2);
        btnSubmit = (Button) findViewById(R.id.btnSubmit);
        mEdit   = (EditText)findViewById(R.id.editCurrency);
        currencyHolder = (TextView) findViewById(R.id.currencyHolder);

        btnSubmit.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                String currency1 = String.valueOf(spinner1.getSelectedItem());
                String currency2 = String.valueOf(spinner2.getSelectedItem());
                float exchangeResult = 0;
                try {
                    exchangeResult = Float.parseFloat(mEdit.getText().toString());
                } catch(NumberFormatException nfe) {

                }
                float rate =  CurrencyHelper.getRateCurrency(currency1,currency2);
                float result =  rate*exchangeResult;
                currencyHolder.setText((result < 0.001 ?  0 : result ) + "");
            }

        });
    }
}
