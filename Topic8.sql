-- 1. Account
CREATE TABLE Account (
    account_id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) NOT NULL CHECK (role IN ('parent', 'nurse', 'manager', 'admin')),
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    last_login DATETIME
);

-- 2. Parent (1-1 với Account)
CREATE TABLE Parent (
    parent_id INT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL UNIQUE,
    name NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20),
    email NVARCHAR(100),
    cccd NVARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

-- 3. Manager (1-1 với Account)
CREATE TABLE Manager (
    manager_id INT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL UNIQUE,
    name NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20),
    email NVARCHAR(100),
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

-- 4. SchoolNurse (1-1 với Account)
CREATE TABLE SchoolNurse (
    nurse_id INT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL UNIQUE,
    name NVARCHAR(100) NOT NULL,
    phone NVARCHAR(20),
    email NVARCHAR(100),
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);

-- 5. Student (không liên kết với account, mang tính bị động)
CREATE TABLE Student (
    student_id INT IDENTITY(1,1) PRIMARY KEY,
    student_code NVARCHAR(20) UNIQUE,
    name NVARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender NVARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    class NVARCHAR(20) NOT NULL,
    school NVARCHAR(100),
    address NVARCHAR(255),
    parent_cccd NVARCHAR(20) NOT NULL,
    blood_type NVARCHAR(5),
    height FLOAT,
    weight FLOAT,
    status NVARCHAR(20) DEFAULT 'active',
    FOREIGN KEY (parent_cccd) REFERENCES Parent(cccd)
);

-- 6. HealthRecord
CREATE TABLE HealthRecord (
    record_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL UNIQUE,  -- Ràng buộc 1-1 với Student
    allergies NVARCHAR(MAX),
    chronic_diseases NVARCHAR(MAX),
    vision_status NVARCHAR(50),
    medical_history NVARCHAR(MAX),
    updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
);

-- 7. HealthCheckup
CREATE TABLE HealthCheckup (
    checkup_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    nurse_id INT,
    checkup_date DATE NOT NULL,
    height FLOAT,
    weight FLOAT,
    vision NVARCHAR(50),
    blood_pressure NVARCHAR(20),
    notes NVARCHAR(MAX),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (nurse_id) REFERENCES SchoolNurse(nurse_id)
);

-- 8. VaccinationRecord
CREATE TABLE VaccinationRecord (
    vaccination_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    vaccine_name NVARCHAR(100) NOT NULL,
    date_of_vaccination DATE NOT NULL,
    administered_by INT NOT NULL,
    follow_up_reminder DATE,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (administered_by) REFERENCES SchoolNurse(nurse_id)
);

-- 9. VaccinationConsent
CREATE TABLE VaccinationConsent (
    consent_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    parent_cccd NVARCHAR(20) NOT NULL,
    vaccine_name NVARCHAR(100) NOT NULL,
    consent_status BIT NOT NULL,
    consent_date DATE NOT NULL,
    notes NVARCHAR(MAX),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (parent_cccd) REFERENCES Parent(cccd)
);

-- 10. MedicineInventory
CREATE TABLE MedicineInventory (
    medicine_id INT IDENTITY(1,1) PRIMARY KEY,
    nurse_id INT,
    name NVARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    expiration_date DATE NOT NULL,
    FOREIGN KEY (nurse_id) REFERENCES SchoolNurse(nurse_id)
);

-- 11. MedicationRequest
CREATE TABLE MedicationRequest (
    request_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    medicine_id INT NOT NULL,
    requested_by INT NOT NULL,
    request_date DATE NOT NULL DEFAULT GETDATE(),
    dosage NVARCHAR(100) NOT NULL,
    frequency NVARCHAR(100),
    duration NVARCHAR(100),
    status NVARCHAR(20) NOT NULL DEFAULT 'pending',
    notes NVARCHAR(MAX),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (medicine_id) REFERENCES MedicineInventory(medicine_id),
    FOREIGN KEY (requested_by) REFERENCES Account(account_id)
);

-- 12. MedicalEvent
CREATE TABLE MedicalEvent (
    event_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    event_type NVARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    description NVARCHAR(MAX),
    handled_by INT,
    outcome NVARCHAR(MAX),
    notes NVARCHAR(MAX),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (handled_by) REFERENCES Account(account_id)
);

-- 13. UserNotification
CREATE TABLE UserNotification (
    notification_id INT IDENTITY(1,1) PRIMARY KEY,
    recipient_id INT NOT NULL,
    title NVARCHAR(200) NOT NULL,
    message NVARCHAR(MAX) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    is_read BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (recipient_id) REFERENCES Account(account_id)
);

