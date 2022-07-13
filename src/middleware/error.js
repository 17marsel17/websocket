
export const error = (req, res) => {
    res.status(404);
    res.json({
        error: 'Страница не найдена',
        status: 404
    });
};