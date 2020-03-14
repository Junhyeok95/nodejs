module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', { // 자동으로 comments 라는 복수형 테이블이 생성 됨, 16줄 참고
        comment: {
            type: DataTypes.STRING(100),
            allowNull: false, // NUT NULL 과 동일
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false, // true 일 경우 createdAt, updatedAt 칼럼을 추가하기 때문
        // 기타 옵션, paranoid: true 를 같이 사용하면 deletedAt 이 추가
        // underscored 옵션은 created_at 과 같이 만듬
        // tableName 옵션은 테이블 이름을 다른 것으로 설정하고 싶을 때 사용
    });
};