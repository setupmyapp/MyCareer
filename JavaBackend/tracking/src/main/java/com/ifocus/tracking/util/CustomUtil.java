package com.ifocus.tracking.util;

import java.io.File;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Locale;

public class CustomUtil {

    private final static SimpleDateFormat GENERIC_DATE_FORMAT = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
    private final static SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss", Locale.ENGLISH);
    private final static DateTimeFormatter GENERIC_DATE_FORMATER = DateTimeFormatter.ofPattern("dd-MMM-yyyy");
    private final static LocalDate EXCEL_EPOCH_REFERENCE = LocalDate.of(1899, Month.DECEMBER, 30);
    private final static String FILE_CONTENT_TYPE_CSV = ".csv";
    private final static String FILE_CONTENT_TYPE_XLSX = ".xlsx";

    private CustomUtil() {
        throw new UnsupportedOperationException("Cannot instantiate a Util class");
    }

    public static String getDefaultPassword() {
        return "ifocus@123";
    }

    public static String getEmployeesInfoDirectory() {
        return "Employee" + File.separator + "CSVImport";
    }

    public static String getEmployeesAttendanceDirectory() {
        return "Employee" + File.separator + "Attendance";
    }

    public static SimpleDateFormat getGenericDateFormat() {
        return GENERIC_DATE_FORMAT;
    }

    public static DateTimeFormatter getGenericDateFormater() {
        return GENERIC_DATE_FORMATER;
    }

    public static LocalDate getExcelEpochReference() {
        return EXCEL_EPOCH_REFERENCE;
    }

    public static SimpleDateFormat getLongDateFormat() {
        return LONG_DATE_FORMAT;
    }

    public static String fileContentTypeCSV() {
        return FILE_CONTENT_TYPE_CSV;
    }

    public static String fileContentTypeXLSX() {
        return FILE_CONTENT_TYPE_XLSX;
    }

    public static String getBase64FromFile(String filePath) {
        String base64 = "";
        try {
            Files.readAllBytes(new File(filePath).toPath());
            base64 = Base64.getEncoder().encodeToString(Files.readAllBytes(new File(filePath).toPath()));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return base64;
    }

}