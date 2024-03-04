const db = require('../loader/db');
const logger = require('../util/logger');

module.exports = {
  // 모든 유저 검색
  getAllUser: async () => {
    let connection;
    try {
      const query = `SELECT * FROM user`;
      connection = await db.getConnection();
      const results = await connection.query(query);

      return results[0];
    } catch (err) {
      logger.error('model Error : ', err.stack);
      console.error('Error', err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  // 유저 검색 (email)
  getUserByEmail: async ({ email }) => {
    let connection;
    try {
      const query = `
            SELECT * 
            FROM users
            WHERE email = ${await db.getEscape(email)}
        `;

      connection = await db.getConnection();

      const user = await connection.query(query);

      return user[0][0];
    } catch (err) {
      logger.error('getUserByEmail model Error : ', err.stack);
      console.error('Error', err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  // 유저 검색 (nickname)
  getUserByNickname: async ({ nickname }) => {
    let connection;
    try {
      const query = `
              SELECT * 
              FROM users
              WHERE nickname = ${await db.getEscape(nickname)}
          `;
      connection = await db.getConnection();
      const results = await connection.query(query);

      return results[0][0];
    } catch (err) {
      logger.error('getUserByNickname model Error : ', err.stack);
      console.error('Error', err.message);
      throw err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  // 회원가입
  createUser: async ({ userId, nickname, password, teamId }) => {
    let connection;
    try {
      const query = ` 
              INSERT INTO users
              (user_id, nickname, password, club_id) 
              VALUES (${userId}, ${nickname}, ${password}, ${teamId})
          `;
      connection = await db.getConnection();
      const results = await connection.query(query);

      return results[0];
    } catch (err) {
      logger.error('createUser model Error : ', err.stack);
      console.error('Error', err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  // 인증 테이블 조회(email)
  getEmailVerificationByEmail: async ({ email }) => {
    let connection;
    try {
      const query = `
            SELECT * 
            FROM email_verifications
            WHERE email = ${await db.getEscape(email)}
        `;
      connection = await db.getConnection();

      const verification = await connection.query(query);

      return verification[0][0];
    } catch (err) {
      logger.error('getUserByEmail model Error : ', err.stack);
      console.error('Error', err.message);
      return err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  // 인증번호 저장
  saveVerificationNumber: async ({ email, randomNumber }) => {
    let connection;
    try {
      const query = ` 
            INSERT INTO email_verifications
            (email, verification_number, is_verified) 
            VALUES ( ${await db.getEscape(email)}, ${await db.getEscape(
              randomNumber,
            )}, 0)
        `;
      connection = await db.getConnection();
      const result = await connection.query(query);

      return result[0];
    } catch (err) {
      logger.error('createUser model Error : ', err.stack);
      console.error('Error', err.message);
      throw err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  updateVerificationStatus: async ({ email }) => {
    let connection;
    try {
      const query = ` 
            UPDATE email_verifications
            SET is_verified = 1
            WHERE email = ${await db.getEscape(email)}
        `;
      connection = await db.getConnection();
      const result = await connection.query(query);

      return result[0];
    } catch (err) {
      logger.error('updateVerificationStatus model Error : ', err.stack);
      console.error('Error', err.message);
      throw err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },

  deleteVerificationNumber: async ({ email }) => {
    let connection;
    try {
      const query = ` 
            DELETE
            FROM email_verifications
            WHERE email = ${await db.getEscape(email)}
        `;
      connection = await db.getConnection();
      const result = await connection.query(query);

      return result[0];
    } catch (err) {
      logger.error('deleteVerificationNumber model Error : ', err.stack);
      console.error('Error', err.message);
      throw err;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },
};
