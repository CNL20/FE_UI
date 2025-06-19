-- Fixed Sample Data for SchoolHealthDB
-- Run this script after creating database structure

USE SchoolHealthDB;
GO

-- Step 1: Delete data in correct order (child tables first)
DELETE FROM UserNotification;
DELETE FROM MedicalEvent;
DELETE FROM MedicationRequest;
DELETE FROM VaccinationConsent;
DELETE FROM VaccinationRecord;
DELETE FROM HealthCheckup;
DELETE FROM HealthRecord;
DELETE FROM Student;
DELETE FROM MedicineInventory;
DELETE FROM Parent;
DELETE FROM Manager;
DELETE FROM SchoolNurse;
DELETE FROM Account;

-- Step 2: Reset identity seeds
DBCC CHECKIDENT ('UserNotification', RESEED, 0);
DBCC CHECKIDENT ('MedicalEvent', RESEED, 0);
DBCC CHECKIDENT ('MedicationRequest', RESEED, 0);
DBCC CHECKIDENT ('VaccinationConsent', RESEED, 0);
DBCC CHECKIDENT ('VaccinationRecord', RESEED, 0);
DBCC CHECKIDENT ('HealthCheckup', RESEED, 0);
DBCC CHECKIDENT ('HealthRecord', RESEED, 0);
DBCC CHECKIDENT ('Student', RESEED, 0);
DBCC CHECKIDENT ('MedicineInventory', RESEED, 0);
DBCC CHECKIDENT ('Parent', RESEED, 0);
DBCC CHECKIDENT ('Manager', RESEED, 0);
DBCC CHECKIDENT ('SchoolNurse', RESEED, 0);
DBCC CHECKIDENT ('Account', RESEED, 0);

-- Step 3: Insert data in correct order

-- 1. Account data
INSERT INTO Account (username, password, role, created_at, last_login) VALUES
('admin01', 'hash123', 'admin', '2024-01-15 08:00:00', '2024-06-15 14:30:00'),
('manager01', 'hash456', 'manager', '2024-01-20 09:00:00', '2024-06-15 10:15:00'),
('nurse01', 'hash789', 'nurse', '2024-02-01 07:30:00', '2024-06-15 08:45:00'),
('nurse02', 'hash101', 'nurse', '2024-02-05 08:00:00', '2024-06-14 16:20:00'),
('parent01', 'hash111', 'parent', '2024-03-01 10:00:00', '2024-06-15 19:30:00'),
('parent02', 'hash222', 'parent', '2024-03-05 11:00:00', '2024-06-14 20:15:00'),
('parent03', 'hash333', 'parent', '2024-03-10 09:30:00', '2024-06-15 18:45:00'),
('parent04', 'hash444', 'parent', '2024-03-15 14:00:00', '2024-06-13 21:00:00'),
('parent05', 'hash555', 'parent', '2024-03-20 16:30:00', '2024-06-15 17:30:00');

PRINT 'Accounts inserted successfully';

-- 2. Manager data
INSERT INTO Manager (account_id, name, phone, email) VALUES
(2, N'Nguyen Van Quan', '0912345678', 'manager@school.edu.vn');

-- 3. SchoolNurse data  
INSERT INTO SchoolNurse (account_id, name, phone, email) VALUES
(3, N'Tran Thi Y Ta', '0923456789', 'nurse01@school.edu.vn'),
(4, N'Le Van Bac Si', '0934567890', 'nurse02@school.edu.vn');

-- 4. Parent data
INSERT INTO Parent (account_id, name, phone, email, cccd) VALUES
(5, N'Pham Van Cha', '0945678901', 'phamvancha@gmail.com', '001234567890'),
(6, N'Le Thi Me', '0956789012', 'lethime@gmail.com', '001234567891'),
(7, N'Nguyen Van Bo', '0967890123', 'nguyenvanbo@yahoo.com', '001234567892'),
(8, N'Tran Thi Ma', '0978901234', 'tranthima@gmail.com', '001234567893'),
(9, N'Hoang Van Ong', '0989012345', 'hoangvanong@outlook.com', '001234567894');

PRINT 'Parents inserted successfully';

-- 5. Student data
INSERT INTO Student (student_code, name, dob, gender, class, school, address, parent_cccd, blood_type, height, weight, status) VALUES
('HS001', N'Pham Minh Anh', '2015-05-15', 'male', '3A', N'Truong Tieu hoc ABC', N'123 Duong ABC, Quan 1, TP.HCM', '001234567890', 'O+', 110.5, 22.3, 'active'),
('HS002', N'Le Thi Binh', '2014-08-20', 'female', '4B', N'Truong Tieu hoc ABC', N'456 Duong DEF, Quan 2, TP.HCM', '001234567891', 'A+', 115.2, 25.1, 'active'),
('HS003', N'Nguyen Van Cuong', '2016-01-10', 'male', '2C', N'Truong Tieu hoc XYZ', N'789 Duong GHI, Quan 3, TP.HCM', '001234567892', 'B+', 105.8, 19.5, 'active'),
('HS004', N'Tran Thi Dung', '2015-11-25', 'female', '3D', N'Truong Tieu hoc XYZ', N'321 Duong JKL, Quan 4, TP.HCM', '001234567893', 'AB+', 108.3, 21.2, 'active'),
('HS005', N'Hoang Minh Em', '2017-03-08', 'male', '1E', N'Truong Tieu hoc MNO', N'654 Duong PQR, Quan 5, TP.HCM', '001234567894', 'O-', 98.7, 16.8, 'active');

PRINT 'Students inserted successfully';

-- 6. HealthRecord data
INSERT INTO HealthRecord (student_id, allergies, chronic_diseases, vision_status, medical_history, updated_at) VALUES
(1, N'Di ung phan hoa', N'Khong co', N'Binh thuong', N'Tien su ho khan vao mua xuan', '2024-06-01 10:00:00'),
(2, N'Di ung tom cua', N'Hen suyen nhe', N'Can thi nhe', N'Tung bi viem phoi nam 2023', '2024-06-02 11:30:00'),
(3, N'Khong co', N'Khong co', N'Binh thuong', N'Phat trien binh thuong', '2024-06-03 09:15:00'),
(4, N'Di ung sua', N'Khong co', N'Vien thi nhe', N'Tung bi tieu chay do di ung thuc an', '2024-06-04 14:20:00'),
(5, N'Khong co', N'Khong co', N'Binh thuong', N'Phat trien cham ve can nang', '2024-06-05 08:45:00');

-- 7. HealthCheckup data
INSERT INTO HealthCheckup (student_id, nurse_id, checkup_date, height, weight, vision, blood_pressure, notes) VALUES
(1, 1, '2024-06-10', 110.5, 22.3, '10/10', '90/60', N'Suc khoe tot, phat trien binh thuong'),
(2, 1, '2024-06-10', 115.2, 25.1, '8/10', '85/55', N'Can theo doi thi luc, co dau hieu can thi'),
(3, 2, '2024-06-11', 105.8, 19.5, '10/10', '88/58', N'Can tang can, dinh duong can cai thien'),
(4, 2, '2024-06-11', 108.3, 21.2, '9/10', '92/62', N'Suc khoe on dinh'),
(5, 1, '2024-06-12', 98.7, 16.8, '10/10', '85/55', N'Can theo doi tang truong');

-- 8. MedicineInventory data
INSERT INTO MedicineInventory (nurse_id, name, quantity, expiration_date) VALUES
(1, N'Paracetamol 500mg', 100, '2025-12-31'),
(1, N'Ibuprofen 200mg', 50, '2025-10-15'),
(1, N'Vitamin C', 200, '2026-03-20'),
(2, N'Betadine', 30, '2025-08-30'),
(2, N'Bang gac y te', 150, '2027-01-15');

-- 9. VaccinationRecord data
INSERT INTO VaccinationRecord (student_id, vaccine_name, date_of_vaccination, administered_by, follow_up_reminder) VALUES
(1, N'Vac xin Soi Rubella', '2024-05-15', 1, '2025-05-15'),
(2, N'Vac xin DPT', '2024-05-20', 1, '2025-05-20'),
(3, N'Vac xin Soi Rubella', '2024-05-25', 2, '2025-05-25'),
(4, N'Vac xin Viem gan B', '2024-06-01', 2, '2025-06-01'),
(5, N'Vac xin DPT', '2024-06-05', 1, '2025-06-05');

-- 10. VaccinationConsent data
INSERT INTO VaccinationConsent (student_id, parent_cccd, vaccine_name, consent_status, consent_date, notes) VALUES
(1, '001234567890', N'Vac xin Soi Rubella', 1, '2024-05-10', N'Dong y tiem chung'),
(2, '001234567891', N'Vac xin DPT', 1, '2024-05-15', N'Dong y tiem chung'),
(3, '001234567892', N'Vac xin Soi Rubella', 1, '2024-05-20', N'Dong y tiem chung'),
(4, '001234567893', N'Vac xin Viem gan B', 1, '2024-05-25', N'Dong y tiem chung'),
(5, '001234567894', N'Vac xin DPT', 1, '2024-05-30', N'Dong y tiem chung');

-- 11. MedicationRequest data
INSERT INTO MedicationRequest (student_id, medicine_id, requested_by, request_date, dosage, frequency, duration, status, notes) VALUES
(1, 1, 5, '2024-06-10', '1 vien', '2 lan/ngay', '3 ngay', 'approved', N'Sot nhe sau tiem chung'),
(2, 2, 6, '2024-06-11', '1/2 vien', '2 lan/ngay', '2 ngay', 'approved', N'Dau dau nhe'),
(3, 3, 7, '2024-06-12', '1 vien', '1 lan/ngay', '30 ngay', 'pending', N'Bo sung vitamin');

-- 12. MedicalEvent data
INSERT INTO MedicalEvent (student_id, event_type, event_date, description, handled_by, outcome, notes) VALUES
(1, N'Tai nan nho', '2024-06-10', N'Te nga trong san choi, tray xuoc dau goi', 3, N'Sat trung va bang bo, theo doi', N'Vet thuong nho, khong can khau'),
(2, N'Con hen suyen', '2024-06-11', N'Kho tho nhe sau khi chay', 3, N'Su dung thuoc xit, nghi ngoi', N'Tinh trang on dinh sau 30 phut');

-- 13. UserNotification data
INSERT INTO UserNotification (recipient_id, title, message, created_at, is_read) VALUES
(5, N'Lich tiem chung', N'Con ban se duoc tiem vac xin Soi-Rubella vao ngay 15/05/2024', '2024-05-10 08:00:00', 1),
(6, N'Ket qua kham suc khoe', N'Ket qua kham suc khoe dinh ky cua con da co. Vui long xem chi tiet.', '2024-06-11 10:30:00', 1),
(7, N'Yeu cau thuoc', N'Yeu cau cap thuoc vitamin C cho con da duoc duyet', '2024-06-12 14:15:00', 0);

PRINT 'Sample data insertion completed successfully!';
PRINT '';
PRINT 'Summary:';
PRINT '- Accounts: 9';
PRINT '- Managers: 1';
PRINT '- School Nurses: 2';
PRINT '- Parents: 5';
PRINT '- Students: 5';
PRINT '- Health Records: 5';
PRINT '- Health Checkups: 5';
PRINT '- Medicine Inventory: 5';
PRINT '- Vaccination Records: 5';
PRINT '- Vaccination Consents: 5';
PRINT '- Medication Requests: 3';
PRINT '- Medical Events: 2';
PRINT '- User Notifications: 3';